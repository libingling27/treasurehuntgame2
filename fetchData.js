async function fetchElementData() {
    try {
        const response = await fetch('data.txt');
        const data = await response.text();
        const elements = data.split('\n').map(line => line.split(': '));
        const randomIndex = getRandomInt(0, elements.length - 1);
        const [key, value] = elements[randomIndex];
        return { key, value };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}