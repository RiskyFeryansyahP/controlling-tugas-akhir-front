import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

const introspectionQueryResultData = {
    __schema: {
        types: [
            {
            kind: "UNION",
            name: "Event",
            possibleTypes: [
                { name: "MahasiswaType" },
                { name: "DosenType" },
            ],
            }, // this is an example, put your INTERFACE and UNION kinds here!
        ],
    },
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
})

export default fragmentMatcher
  