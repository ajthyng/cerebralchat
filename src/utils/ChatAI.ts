import { fakeID } from './Helpers'
import { Subject } from './Subject'

export const getChatAI = async () => {
  const response = await fetch('https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json')
  // I would normally do exhaustive checking here to
  // ensure the response from the API can be used.
  const data = await response.json() as AIEntry[]
  return data
}

type AIEntry = {
  id: number
  question: string
  validation: string[] | string | boolean
  paths?: { [key: string]: number } | number
}

class SupportQuestion {
  id: number
  question: string
  validation: string[] | string | boolean
  paths?: { [key: string]: number } | number
  _nextPath?: number

  constructor (entry: AIEntry) {
    this.id = entry.id
    this.question = entry.question
    this.paths = entry.paths
    this.validation = entry.validation
  }

  get isEndState () {
    return !this.paths
  }

  get nextPath () {
    return this._nextPath || this.id
  }

  async validate (input: string) {
    if (this.isEndState || this.validation === false) return false
    if (this.validation === true) {
      if (typeof this.paths === 'number') this._nextPath = this.paths
      return true
    }

    if (typeof this.validation === 'string') {
      const regexp = new RegExp(this.validation)
      const isValid = regexp.test(input)
      if (isValid && typeof this.paths === 'number') {
        this._nextPath = this.paths
      }
      return isValid
    }

    if (Array.isArray(this.validation)) {
      let isValid = false
      for (let i = 0; i < this.validation.length; i++) {
        const entry = this.validation[i]
        isValid = entry.toLowerCase().trim() === input.toLowerCase().trim()
        if (isValid && typeof this.paths === 'object') {
          this._nextPath = this.paths[entry]
        } else if (isValid && typeof this.paths === 'number') {
          this._nextPath = this.paths
        }
        if (isValid) break
      }
      return isValid
    }

    return false
  }

  async hasNext () {
    return this._nextPath !== undefined
  }
}

interface Message {
  id: string
  text: string
  from: string
  to: string
}

export class LiveSupport {
  supportId: string
  questions: Map<number, SupportQuestion>
  current?: SupportQuestion
  currentIsValid?: boolean
  messageHistory: Message[]

  constructor (data: AIEntry[], user: string, support: string) {
    this.questions = new Map<number, SupportQuestion>()
    this.supportId = support
    this.messageHistory = []

    for (const entry of data) {
      // The best guess I'm able to make from the data is that the first question in the array
      // with defined paths is the first question that should be asked
      //
      // I also considered sorting by ID and taking the first ID with a value greater than 0, but
      // the entry with id: 9 has an ID greater than 0 and would be a pretty terrible question to start off on.
      // I also don't know if the source of data will always arrive in a consistent order.
      if (entry.paths !== undefined && !this.current) {
        this.current = new SupportQuestion(entry)

        this.messageHistory.push({
          id: fakeID(),
          from: this.supportId,
          to: user,
          text: this.current.question
        })
      }

      this.questions.set(entry.id, new SupportQuestion(entry))
    }
  }

  private askAgain () {
    const baseMessage = "I'm sorry, could you try answering this question again?"
    let additionalOptions = ''
    if (this.current && Array.isArray(this.current.validation)) {
      const firstSet = this.current.validation.slice(0, -1)
      if (firstSet < this.current.validation) {
        const lastItem = this.current.validation.slice(-1)
        additionalOptions = `Possible answers are: ${firstSet.join(', ')}, and ${lastItem}`
      } else {
        additionalOptions = `The only answer is: ${this.current.validation.join(' ')}`
      }
      return baseMessage + additionalOptions
    }
    return baseMessage
  }

  async receiveMessage (message: Omit<Message, 'id' | 'to'>) {
    this.addToHistory({
      ...message,
      to: this.supportId
    })

    const isValid = await this.isValid(message.text)
    if (isValid) {
      await this.next()
      if (this.current) {
        this.addToHistory({
          to: message.from,
          from: this.supportId,
          text: this.current.question
        })
      }
    } else {
      if (this.current && !this.current.isEndState) {
        this.addToHistory({
          text: this.askAgain(),
          from: this.supportId,
          to: message.from
        })
      } else {
        this.addToHistory({
          text: 'I\'m sorry, this chat session has ended. Please reload your app if you\'d like to chat again.',
          from: this.supportId,
          to: message.from
        })
      }
    }
    Subject.next('messages-update')
  }

  private async isValid (input: string) {
    if (this.current) {
    // I don't want to accidentally discard a valid response with an invalid one if the user has spammed messages
      const isValid = await this.current.validate(input)

      if (this.currentIsValid === undefined || this.currentIsValid === false) {
        this.currentIsValid = isValid
      }

      // I do want to replace an existing valid response with another valid response
      if (isValid) this.currentIsValid = isValid

      return this.currentIsValid
    } else {
      return false
    }
  }

  private addToHistory ({ from, to, text }: { from: string, to: string, text: string }) {
    this.messageHistory.splice(0, 0, {
      from,
      to,
      text,
      id: fakeID()
    })
  }

  private async next () {
    if (this.current && this.current.hasNext()) {
      this.current = this.questions.get(this.current.nextPath)
      this.currentIsValid = undefined
    }
  }
}
