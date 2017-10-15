interface ITheme {
    name: string;
    enqueue: string;
    dequeue: string;
    bigImageSrc: string;
    enable: ($node: JQuery, theme: ITheme) => void;
    nodeIcon: () => string;
    changed?: ($: JQuery) => void;
    displayName: string;
    description: string;
    head: string;
    tail: string;
    headTail: string;
}

export const THEMES: ITheme[] = [
    {
        displayName: 'Menschen',
        description: 'Menschen warten vor einer Bürotür',
        name: 'people',
        enqueue: 'Anstellen',
        dequeue: 'Schlange verlassen',
        bigImageSrc: 'assets/people/door.svg',
        head: 'Erster',
        tail: 'Letzter',
        headTail: '',
        nodeIcon: () => `assets/people/person${random(100)}.svg`,
        enable($node, t) {
            $node
                .css('background-image', `url(${t.nodeIcon()})`)
                .addClass('themed');
        }
    },
    {
        name: 'print',
        displayName: 'Drucker',
        description: 'Der Drucker arbeitet die Dateiliste ab',
        enqueue: 'Druckauftrag geben',
        dequeue: 'Drucker bereit',
        bigImageSrc: 'assets/print/printer.svg',
        head: 'Früher',
        tail: 'Später',
        headTail: '',
        nodeIcon: () => `assets/print/file${random(10)}.svg`,
        enable($node, t) {
            $node
                .css('background-image', `url(${t.nodeIcon()})`)
                .addClass('themed');
        }
    },
    {
        name: 'nodes',
        enqueue: 'Enqueue',
        displayName: 'Verkettete Nodes',
        description: 'Prinzip: Verkettung mit Nodes',
        bigImageSrc: 'assets/nodes/javaCircle.svg',
        dequeue: 'Dequeue',
        head: 'head',
        tail: 'tail',
        headTail: 'head / tail',
        nodeIcon: () => '',
        enable($node, t) {
            $node.css('background-image', '').removeClass('themed');
        }
    }
];

function random(max: number) {
    return Math.floor(Math.random() * max + 1);
}
