---
title: "DatQL"
path: "/projects/datql"
sub: "2017 – "
icon: "datql"
tagline: "I Vant To Drink Your Data (Dracula)"
duration: "October 2017 – Present"
website: "https://github.com/Linguistic/dql.js"
status: "Active"
stack: "JavaScript"
---

### Overview

[DatQL](https://github.com/Linguistic/dql.js) (DQL) is a markup language similar to GraphQL that transpiles to vanilla SQL. It's dead-simple to use, and supports three major SQL flavors: MSSQL, PostgreSQL, and MySQL. The project also comes with a [webpack loader](https://github.com/Linguistic/dql-loader) and sister project called [Dracula](https://github.com/Linguistic/dracula). While DatQL handles the transpilation of DQL to SQL, Dracula allows you to export DatQL queries as functions that execute the transpiled SQL directly on your database.

More details and usage info for these projects can be found in their respective repos.

### Motivation

DatQL grew out of a very specific question we had during the development of [Linguistic](/projects/linguistic): what is the most elegant way to store and run queries against a database from an API service? Linguistic's API layer, written in Node, queries the database most often. SQL queries could be built using complex query builders, or injected as strings by-hand. However, it often became difficult to assess at first glance which data would actually be returned from the query, especially if the query was particularly long or sophisticated. We wanted to store our queries as separate files for clarity, but were still not sold on the idea of reading in and running .sql files as strings. As such, we went ahead and built our own solution: DatQL.

Yet on a broader level, DatQL really exists for the same reason software such as Java or .NET exists: autonomy and system independence. Engineering requirements change rapidly, and refining your SQL queries to match the flavor of your system database should be one thing you _don't_ have to worry about. Furthermore, SQL syntax can be daunting, especially when it comes to nested queries. DatQL presents queries as a hierarchy, making it easy to visualize what exactly is happening.

You can also check out [the writeup on the DatQL repo](https://github.com/Linguistic/dql.js#so-whats-the-point) that dives a bit into the motivation of the library as well.

### Usage

You want to receive a list of user text messages, but also include the user's name in your response. Instead of writing:

```sql
SELECT
  user_name
FROM text_messages
  INNER JOIN (SELECT
                users.name AS user_name
              FROM users) ON (users.id = text_messages.user_id)) AS users
WHERE (conversation_id = 5)
```

You can just write:

```graphql
query getUserTextMessages($conversation_id) {
    text_messages(conversation_id = $conversation_id) {
        ...on users(id = text_messages.user_id) {
            name[user_name]
        }
    }
}
```

The argument the table name accepts denotes how it should filter the results of that table, the `...on` selector denotes a `JOIN`, its parameters denote on which field the `JOIN` should occur, and the bracket ([]) notation denotes an alias for the returned query.

### Design

The DQL language relies heavily on [Jison](https://github.com/zaach/jison), a JavaScript port of the popular GNU library [Bison](https://www.gnu.org/software/bison/), to parse query documents and construct abstract syntax trees (ASTs). The [grammar](https://github.com/Linguistic/dql.js/blob/master/cfg/grammar.jison) the language uses is surprisingly complex, and took a great deal of fine-tuning to get just right.

When you pass in a template string to DatQL it first runs the string through the Jison parser. Once the string has been parsed to an AST (or an error has been thrown), the library decides whether it is reading a Query (`SELECT`) or Mutation (`INSERT` / `UPDATE`) statement. If multiple statements are defined in a single string or file, DatQL looks at the the last statement defined and will only run the others if they are referenced by the last statement.

After DatQL has decided whether to transpile a mutation or query, the AST is passed to either a [Query Processor](https://github.com/Linguistic/dql.js/blob/master/src/processors/QueryProcessor.js) or [Mutation Processor](https://github.com/Linguistic/dql.js/blob/master/src/processors/MutationProcessor.js). Each processor will treat the tree differently based on whether it's a query or mutation. The third kind of processor, a [Join Processor](https://github.com/Linguistic/dql.js/blob/master/src/processors/JoinProcessor.js), only handles `JOIN` statements and is shared between the other two processors.

Each processor has a `process()` method, which accepts an array of root tree nodes for each query / mutation statement defined in the string, the initial tree node to begin traversing on, the config options the user has passed in, and the query builder instance to use. DatQL uses the [Squel.js](https://hiddentao.com/squel/) query builder to build all of its SQL queries.
