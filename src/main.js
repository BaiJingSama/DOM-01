const div = dom.create('<div>123</div>')
// console.log(div);
dom.after(text, div)

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(text, div3)

// const nodes = dom.empty(window.empty)
// console.log(nodes);

dom.attr(text, 'title', 'hi,I am Jackey')

const title = dom.attr(text, 'title')
console.log(`title:${title}`);

let look1 = dom.text(text1, '我是新内容')
console.log(look1)

let look2 = dom.html(text1, '112')
console.log(look2);

dom.style(text1, {
    border: '1px solid red',
    color: 'blue'
})
console.log(dom.style(text1, 'border'));
dom.style(text, 'border', '1px solid skyblue')

dom.class.add(text, 'red')
dom.class.add(text, 'blue')
dom.class.remove(text, 'blue')
console.log(dom.class.has(text, 'blue'))
const fn = () => {
    console.log('点击了')
}
dom.on(text, 'click', fn)
dom.off(text, 'click', fn)

const textDiv = dom.find('#text')[0]
console.log(textDiv);
console.log(dom.find('.red', textDiv)[0])

console.log(dom.parent(text))
console.log(dom.children(text));

console.log(dom.siblings(dom.find('#s2')[0]));
console.log(dom.next(dom.find('#s2')[0]));
console.log(dom.previous(dom.find('#s2')[0]));

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

const s2 = dom.find('#s2')[0]
console.log(dom.index(s2));