
# Web-Component Demo

This project is a demonstration of web components, presented at the Orlando Codecamp. It uses the Marvel API to fetch and display data about Marvel characters.

![Web Components](/web-components-demo.jpg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your local development machine.
- A Marvel API key. You can get one from the [Marvel Developer Portal](https://developer.marvel.com/).

### Installation

1. Clone the repository to your local machine:

```sh
git clone https://github.com/JavaVista/web-component-demo.git
```

2. Navigate into the project directory:

```sh
cd web-component-demo
```

3. Install the project dependencies:

```sh
npm install
```

1. Create a `.env` file in the root directory of the project and add your Marvel API keys:

```env
PUBLIC_KEY=your_public_key
PRIVATE_KEY=your_private_key
```

Remember to replace `your_public_key` and `your_private_key` with your actual Marvel API keys.

5. Start the development server:

```sh
npm start
```

The application should now be running at `http://localhost:1234`.

## Usage

Enter a Marvel character's name in the search box and click the "Submit" button. The application will display information about the character. To search for a character, type the name in the input box and select a character from the autocomplete list. The details of the selected character will then be populated.

## License

This project is licensed under the ISC License.

## Acknowledgments

- Thanks to the [Orlando Code Camp](https://orlandocodecamp.com/) for the opportunity to present this project.
- Thanks to Marvel for providing the API.
