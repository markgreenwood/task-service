# task-service

## Description

An API for storing and retrieving task information. 
Can be used with to-do list applications.

## API Reference

### Objects

```json
{
    "description": "string",
    "dueTimestamp": "datetime",
    "startTimestamp": "datetime",
    "completed": "boolean",
    "priority": "number",
    "context": "string",
    "note": "string",
    "completedTimestamp": "datetime",
    "folder": "string"
}
```

### Endpoints

```rest
GET /task
```
Gets a list of tasks.
```rest
GET /task/:id
```
Gets the details of the specific task (:id).
```rest
POST /task
```
Creates a new task and returns the `POST`ed object.
```rest
PUT /task/:id
```
Updates a task (:id) using the provided payload. Returns a copy of the updated object.
```rest
DELETE /task/:id
```
Removes a task (:id) and returns a copy of the `DELETE`d item.

## Tests

The accompanying test suite can be run using the `npm test` command.
This runs all of the following three items, which can be run separately:
- `npm run lint`: runs the linter
- `npm run unittest`: runs unit tests
- `npm run functest`: runs functional tests

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

## License

The MIT License (MIT)
Copyright (c) 2016 Mark Greenwood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
