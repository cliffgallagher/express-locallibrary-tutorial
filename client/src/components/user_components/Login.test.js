const { render } = require("jade")

test('Login component', () => {
    render(<Login/>);

    screen.debug();
})