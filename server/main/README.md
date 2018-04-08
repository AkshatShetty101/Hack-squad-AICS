# Server Codebase

### Directory structure -
1. /config - contains all configurations
2. /src - main application code
3. /tests - to test the application
4. /uploads - all uploads from front end are stored here

All directories should have a **README** telling what it does and the subdirectories it contains.

**Documentation** as you code:
- Multiline (documentation style) before function to describe what function does.
- Multiline for some large description of statement.
- Singleline for simple description of statement.

### Code Style

1. ES6 / ES7 (let, const, 'use strict') code format.
2. Compulsory semi-colons. 
3. UpperCamelCase function `function BankAccount {}` and lowerCamelCase variable names `let adminUser = ...`.
4. Same line curly braces => `if (condition) { ... `
5. Descriptive variable & function names => No `function r() {}`. Please `function DivideResultByTwo() {}`
6. All constant names are caps and snake_case => `const MAX_BUFFER_LIMIT = 10000;`
7. Tabs of size 4 for indentation
8. Configure required environment variables in `.env.example`

**Avoid spelling mistakes.**

**Maintain Readabilitly of Code**