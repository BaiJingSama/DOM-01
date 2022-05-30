window.dom = {};

// document.createElement('div')
dom.create = function (string) { //新建标签元素
    // return document.createElement(tagName);
    const container = document.createElement('template') // 新HTML标签 可以容纳任何元素
    container.innerHTML = string.trim(); // trim函数 去掉字符串两边的空格 
    return container.content.firstChild; // 如果要显示td等元素 必须要这样拿才拿得到
};

dom.after = function (node, node2) { //新增一个弟弟
    node.parentNode.insertBefore(node2, node.nextSibling) //在下一个元素的前面新增一个元素 因为DOM没有这个API
}

dom.before = function (node, node2) { // 新增一个哥哥
    node.parentNode.insertBefore(node2, node) // 在node前面新增一个node2元素
}

dom.append = function (parent, node) { // 新增一个儿子
    parent.appendChild(node) //给parent元素新增一个儿子
}

dom.wrap = function (node, parent) { // 给node元素新增一个父亲
    dom.before(node, parent) //先在node前面新增一个哥哥
    dom.append(parent, node) //把node元素移动到哥哥里面变成它的儿子
}

dom.remove = function (node) { // 删除这个元素
    node.parentNode.removeChild(node) // 选中node的父亲删除node
    return node //返回被删除的node
}

dom.empty = function (node) { // 删除node的所有儿子
    // const childNodes = node.childNodes 简写成下面
    const {
        childNodes
    } = node //把node先装进一个变量，因为要遍历
    const array = []; // 声明一个空数组因为要返回
    /*for (let i = 0; i < childNodes.length; i++) { childNodes.length实时变换要用while循环
        dom.remove(childNodes[i]) 删除每一个遍历到的元素
        array.push(childNodes[i]) 把每个遍历到的元素添加到空数组里
    }*/
    let x = node.firstChild
    while (x) {
        array.push(dom.remove(node.firstChild)) // 删掉第一个儿子，然后把删除的结果添加到空数组
        x = node.firstChild // 删完后 第二个儿子变第一个儿子 我们把x再指向第一个儿子
    }
    return array //返回这个数组
}

dom.attr = function (node, name, value) { //改或者读属性值 {重载}
    if (arguments.length === 3) {
        node.setAttribute(name, value) // arguments长度等于3 就代表想改
    } else if (arguments.length === 2) {
        return node.getAttribute(name) // arguments长度等于2 就代表想读，返回这个值就行
    }
}

dom.text = function (node, string) { //改或查看文本内容 {适配}
    if (arguments.length === 2) {
        if ('innerText' in node) {
            node.innerText = string // ie 
        } else {
            node.textContent = string // firefox chrome
        }
    } else if (arguments.length === 1) {
        if ('innerText' in node) {
            return node.innerText
        } else {
            return node.textContent
        }
    }
}

dom.html = function (node, string) { //改或查看HTML标签
    if (arguments.length === 2) {
        node.innerHTML = string
    } else if (arguments.length === 1) {
        return node.innerHTML
    }
}

dom.style = function (node, name, value) { //添加或查看style属性
    if (arguments.length === 3) {
        // dom.style(div,'color','red')
        node.style[name] = value //把value赋值给name
    } else if (arguments.length === 2) {
        if (typeof name === 'string') { //如果第二个参数是字符串
            // dom.style(div,'color')
            return node.style[name] //就返回这个属性名内的属性
        } else if (name instanceof Object) { // 如果第二个参数是对象
            // dom.style(div,{name: 'value'})
            const object = name
            for (let key in object) { //遍历这个对象  
                // key:border / color
                // node.style.border = ...
                // node.style.color = ...
                node.style[key] = object[key] //把参数的属性值添加进去
            }
        }
    }
}

dom.class = { // 添加删除查看类名
    add(node, className) { //add属性 添加类名
        node.classList.add(className)
    },
    remove(node, className) { // remove属性 删除类名
        node.classList.remove(className)
    },
    has(node, className) { // has属性 查看类名
        return node.classList.contains(className) // 记住要有返回值 不然就看了个寂寞
    }
}

dom.on = function (node, eventName, fn) { //添加事件监听
    node.addEventListener(eventName, fn)
}

dom.off = function (node, evertName, fn) { //删除事件监听
    node.removeEventListener(evertName, fn)
}

dom.find = function (selector, scope) { //在一个范围通过选择器找它的儿子 

    return (scope || document).querySelectorAll(selector)
}

dom.parent = function (node) {
    return node.parentNode
}

dom.children = function (node) {
    return node.children
}

dom.siblings = function (node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
}

dom.next = function (node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
        x = x.nextSibling
    }
    return x
}

dom.previous = function (node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
        x = x.previousSibling
    }
    return x
}

dom.each = function (nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i])
    }
}

dom.index = function (node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
        if (list[i] === node) {
            break
        }
    }
    return i
}