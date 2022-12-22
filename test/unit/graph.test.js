'use strict';
const EasyGraphQLTester = require("easygraphql-tester");
const fs = require("fs");
const path = require("path");

describe('Queries', () => {
    let tester;
    const schema = fs.readFileSync(
      path.join('','', "schema/schema.gql"),
      "utf8"
    );
    beforeAll(() => {
        tester = new EasyGraphQLTester(schema)
    })
    
    test('Should get post with a nested query', () => {
    const query = `
      query getPosts($offset: Int!){
        getPosts(offset: $offset) {
            body
            title
        }
    }`
    tester.test(true, query, { offset: 2 })
  })
})