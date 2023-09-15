import { v4 as uuidv4 } from 'uuid'

export const multiOptionsMoc = [
  {
    name: 'Languages',
    id: 2,
    child: [
      {
        name: 'Programming',
        id: 324,
        child: [
          {
            name: 'JavaScript',
            id: uuidv4()
          },
          {
            name: 'Ruby',
            id: uuidv4()
          },
          {
            name: 'Python',
            id: 1010
          }
        ]
      },
      {
        name: 'Human',
        id: 324,
        child: [
          {
            name: 'Russian',
            id: 'lakdsnfkl-wfkfn'
          },
          {
            name: 'English',
            id: 'relknqo'
          },
          {
            name: 'Chinese',
            id: 12
          }
        ]
      }
    ]
  }
]
