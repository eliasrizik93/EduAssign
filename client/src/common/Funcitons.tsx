const colors = [
    '#ff0000',
    '#0000ff',
    '#00ff00',
    '#800080',
    '#ffa500',
    '#008080',
    '#ff69b4',
    '#4b0082',
    '#00ffff',
    '#00ff00',
    '#ffbf00',
    '#9370db',
    '#87cefa',
    '#ffbf00',
];

export const capitalize = (name: string): string => {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export const getInitials = (name: string): string => {
    const nameParts = name.split(' ');
    const initials = nameParts
        .map(part => part.charAt(0).toUpperCase())
        .join('');
    return initials;
};

export const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};