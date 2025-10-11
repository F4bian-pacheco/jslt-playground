# JSLT Playground

A web-based playground for experimenting with JSLT (JSON Language Transformation) expressions. This project provides an interactive environment where you can write JSLT transformations and see results in real-time.

## Features

- **Three-Panel Layout**: Input JSON, JSLT Expression, and Output JSON
- **Syntax Highlighting**: Full JSLT syntax highlighting with Monaco Editor
- **Auto-completion**: Smart auto-completion for JSLT keywords and functions
- **Real-time Validation**: Instant validation of JSLT expressions
- **Error Handling**: Clear error messages and suggestions
- **Auto-closing**: Automatic closing of quotes, brackets, and braces
- **Variable Support**: JSLT variables with `let` statements and `$variable` references

## Architecture

### Backend (FastAPI)
- **Clean Architecture**: Organized into services, models, and API layers
- **Modular JSLT Interpreter**: Refactored using Strategy + Chain of Responsibility patterns
- **Extensible Design**: Easy to add new functions and evaluators
- **RESTful API**: Transform and validation endpoints
- **CORS Support**: Configured for frontend integration

**Key Design Patterns:**
- **Strategy Pattern**: Each expression type has its own evaluator
- **Chain of Responsibility**: Evaluators are tried in priority order
- **Dependency Injection**: Evaluators receive service reference for recursive evaluation
- **Template Method**: Base classes define structure, subclasses implement details

### Frontend (React + TypeScript)
- **Monaco Editor**: Professional code editing experience
- **Custom JSLT Language**: Full language definition with syntax highlighting
- **Responsive Design**: Clean, professional UI with VS Code-like theming
- **Real-time Updates**: Instant feedback and transformation

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python start.py
   ```

   The API will be available at http://localhost:8000
   API documentation at http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at http://localhost:3000

## JSLT Language Support

This playground supports core JSLT features including:

### Basic Operations
- Path expressions: `.field`, `.array[0]`, `.nested.field`
- Object construction: `{ "key": .value }`
- Array construction: `[.item1, .item2]`

### Variables
- Variable declaration: `let variable = expression`
- Variable reference: `$variable`
- Local scope in objects, arrays, and control structures

### Functions
- `size(array)` - Get array/object/string length
- `string(value)` - Convert to string
- `number(value)` - Convert to number
- `boolean(value)` - Convert to boolean
- `round(number)` - Round to nearest integer

### Control Flow
- `for (.array) expression` - Array iteration
- `if (condition) then else` - Conditional expressions

### Example Transformations

**Input JSON:**
```json
{
  "name": "John Doe",
  "age": 30,
  "skills": ["JavaScript", "Python", "React"]
}
```

**JSLT Expression (with variables):**
```jslt
let skillCount = size(.skills)
{
  "fullName": .name,
  "isAdult": .age >= 18,
  "skillCount": $skillCount,
  "primarySkill": .skills[0]
}
```

**Output:**
```json
{
  "fullName": "John Doe",
  "isAdult": true,
  "skillCount": 3,
  "primarySkill": "JavaScript"
}
```

**Advanced Example with Variables:**
```jslt
let users = .employees
let total = size($users)
{
  "company": .company,
  "totalEmployees": $total,
  "avgAge": for ($users) .age | sum / $total,
  "seniorEmployees": [for ($users) if (.age >= 30) .name]
}
```

## API Endpoints

### POST /api/v1/transform
Transform JSON using JSLT expression.

**Request:**
```json
{
  "input_json": {...},
  "jslt_expression": "..."
}
```

**Response:**
```json
{
  "success": true,
  "output": {...},
  "execution_time_ms": 1.23
}
```

### POST /api/v1/validate
Validate JSLT expression syntax.

**Request:**
```json
{
  "jslt_expression": "..."
}
```

**Response:**
```json
{
  "valid": true,
  "error": null,
  "suggestions": []
}
```

## Development

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm run build
```

## Variable Features

Variables in JSLT allow you to:

- **Avoid repeated calculations**: Store complex expressions in variables
- **Improve readability**: Break down complex transformations
- **Share values**: Use the same computed value multiple times

**Variable Scope:**
- Variables defined with `let` are locally scoped
- Variables are accessible in the expression following the declaration
- Variable references use the `$` prefix

## Missing Features & Roadmap

This JSLT implementation currently supports core functionality but is missing some advanced features from the official JSLT specification:

### 🚧 Not Yet Implemented

**Array Operations:**
- **Array slicing**: `[1:3]`, `[1:-1]`, `[-2:]` syntax
- **Negative indexing**: `[-1]` for last element
- **Array filtering**: `[for (.array) if (condition) expression]`

**Advanced Variable Features:**
- **Variables in complex expressions**: `$var > 1`, `$var + 10` (partial support)
- **Variables in object keys**: `{ $dynamicKey: .value }`
- **Let statements in objects**: `{ let x = .value, "result": $x }`
- **Multiple let statements**: `let a = .x let b = .y`

**Control Flow Enhancements:**
- **For loop filtering**: `for (.array) if (.condition) .result`
- **Nested for loops**: `for (.outer) for (.inner) expression`
- **Complex if-then-else**: Multi-level conditionals

**String Operations:**
- **String interpolation**: Template-like string construction
- **String functions**: `split()`, `join()`, `contains()`, `starts-with()`, `ends-with()`
- **Regular expressions**: Pattern matching and replacement

**Mathematical Operations:**
- **Arithmetic operators**: `+`, `-`, `*`, `/`, `%` between variables and values
- **Mathematical functions**: `min()`, `max()`, `sum()`, `avg()`
- **Type coercion**: Automatic type conversion in operations

**Advanced Functions:**
- **Date/time functions**: `parse-time()`, `format-time()`
- **Collection functions**: `flatten()`, `distinct()`, `sort()`
- **Object functions**: `keys()`, `values()`, `merge()`

**Error Handling:**
- **Try-catch equivalents**: Graceful error handling
- **Default values**: `(.field // "default")`
- **Null propagation**: Safe navigation operators

**Performance Features:**
- **Expression optimization**: Compile-time optimizations
- **Caching**: Repeated expression caching
- **Lazy evaluation**: On-demand computation

### 🎯 Implementation Priority

**High Priority:**
1. Array slicing and negative indexing
2. Variables in complex expressions (`$var > 1`)
3. Basic arithmetic operations (`+`, `-`, `*`, `/`)
4. String manipulation functions

**Medium Priority:**
1. Advanced for loop features
2. Mathematical functions (`min`, `max`, `sum`)
3. Object manipulation functions
4. Error handling improvements

**Low Priority:**
1. Date/time functions
2. Regular expressions
3. Performance optimizations
4. Advanced control flow

### 🤝 Contributing Missing Features

We welcome contributions! If you'd like to implement any of these missing features:

1. Check the [official JSLT specification](https://github.com/schibsted/jslt)
2. Review the modular implementation in `backend/app/services/jslt/`
   - Add new evaluators in `evaluators/` for new expression types
   - Add new functions in `functions/builtin_functions.py`
   - Use the existing base classes for consistency
3. Add comprehensive tests for new features
4. Update documentation and examples

**Example: Adding a New Function**
```python
# In backend/app/services/jslt/functions/builtin_functions.py
class UpperFunction(BaseFunction):
    @property
    def name(self) -> str:
        return "upper"

    def execute(self, value: str) -> str:
        return value.upper()

# Register it in BUILTIN_FUNCTIONS list
BUILTIN_FUNCTIONS = [
    # ... existing functions
    UpperFunction(),
]
```

See the Contributing section below for detailed guidelines.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.