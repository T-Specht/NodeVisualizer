import './styles/main.scss';

import * as $ from 'jquery';
import * as anime from 'animejs';
import { TweenMax } from 'gsap';

import { THEMES } from './themes';

const WIDTH = 60;

let theme = 'people';

const $queue = $('.queue .nodes');

$('.enqueue').click(e => {
    enqueue();
});

$('.dequeue').click(e => {
    dequeue();
});

$('.run').click(e => {
    let i = setInterval(() => {
        if ($queue.children().not('.removing').length == 0) {
            clearInterval(i);
        } else {
            dequeue();
        }
    }, 1000);
});

$('input.captions').change(e => {
    captions();
});

function dequeue() {
    const $last = $queue
        .children()
        .not('.removing')
        .last()
        .addClass('removing');

    captions();

    const tl = anime.timeline();
    tl
        .add({
            targets: $last.get(),
            translateY: 120,
            scaleX: 0
        })
        .add({
            targets: $last.get(),
            width: 0,
            margin: 0,
            padding: 0,
            height: 0,
            offset: 100,
            easing: 'linear',
            duration: 250
        });

    tl.complete = () => {
        $last.remove();
    };
}

function size() {
    return $queue.children().not('.removing').length;
}

function enqueue() {
    const $node = $('<div>')
        .append(
            $('<div>')
                .text(Math.round(Math.random() * 100))
                .addClass('content')
        )
        .append(
            $('<div>')
                .text('')
                .addClass('pointer')
        )
        .addClass('node')
        .css('width', 0);

    useThemeOnNode($node, theme);

    $queue.prepend($node);

    captions();

    anime({
        targets: $node.get(),
        width: WIDTH,
        opacity: [0, 1]
    });
}

function captions() {
    if (!$('input.captions').prop('checked')) {
        $('.node .pointer', $queue)
            .not('.removing')
            .text('');
        return;
    }

    const THEME = THEMES.find(t => t.name == theme);
    if (THEME) {
        if (size() == 1) {
            $('.node .pointer', $queue)
                .not('.removing')
                .text(THEME.headTail);
        } else if (size() > 1) {
            $('.node .pointer', $queue)
                .not('.removing')
                .text('');
            $(
                '.pointer',
                $('.node', $queue)
                    .not('.removing')
                    .first()
            ).text(THEME.tail);
            $(
                '.pointer',
                $('.node', $queue)
                    .not('.removing')
                    .last()
            ).text(THEME.head);
        }
    }
}

function useThemeOnNode($node: JQuery, themeName: string, transition = false) {
    const THEME = THEMES.find(t => t.name == themeName);
    $node.removeClass('themed');
    $node.css('background-image', '');

    if (transition) {
        $node.addClass('transition-wanted');
        setTimeout(() => {
            $node.removeClass('transition-wanted');
        }, 250);
    }

    if (THEME) {
        THEME.enable($node, THEME);
    }
}

function useTheme(themeName: string) {
    theme = themeName;
    const THEME = THEMES.find(t => t.name == theme);
    if (THEME) {
        $('.enqueue').text(THEME.enqueue);
        $('.dequeue').text(THEME.dequeue);
        $('img.big').attr('src', THEME.bigImageSrc);
        $('.description').text(THEME.description);

        $('.node', $queue).each((i, node) =>
            useThemeOnNode($(node), themeName, true)
        );
        captions();
    }
}

$(document).ready(() => {
    useTheme(theme);
    enqueue();
    $('select.theme')
        .append(
            ...THEMES.map(t =>
                $('<option>')
                    .text(t.displayName)
                    .val(t.name)
            )
        )
        .val(theme)
        .change(e => {
            useTheme($(e.target).val() as string);
        });
});
(window as any)['useTheme'] = useTheme;
