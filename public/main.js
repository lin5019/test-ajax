//AJAX加载CSS
let getCSS = document.querySelector(".getCSS");
let getJS = document.querySelector(".getJS");
let getHTML = document.querySelector(".getHTML");
let getXML = document.querySelector(".getXML");
let getJSON = document.querySelector(".getJSON");
let getNextPage = document.querySelector(".getNextPage");
let getPreviousPage = document.querySelector(".getPreviousPage");

getCSS.onclick = () => {
  //1第一步创建对象
  const request = new XMLHttpRequest();
  //2第二步.使用open方法,添加请求方式,请求地址.
  request.open("GET", "/style.css");
  //3第三步.监听请求对象load,error
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      let style = document.createElement("style");
      style.innerHTML = request.response;
      document.head.appendChild(style);
    }
  };

  //4第四步,请求对象调用send()发起请求.
  request.send();
};
//AJAX加载JS
getJS.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "a.js");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let script = document.createElement("script");
      script.innerHTML = request.response;
      document.body.appendChild(script);
    }
  };
  request.send();
};
//AJAX加载HTML
getHTML.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "/b.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let div = document.createElement("div");
      div.innerHTML = request.response;
      document.body.appendChild(div);
    }
  };
  request.send();
};
//AJAX加载XML
getXML.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "/c.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let dom = request.responseXML;
      console.log(dom);
      let text = dom.getElementsByTagName("warning")[0].textContent;
      console.log(text.trim());
    }
  };
  request.send();
};
//AJAX加载JSON
getJSON.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "/d.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.response);
      console.log(typeof request.response);
      let obj = JSON.parse(request.response);
      console.log(obj);
      console.log(typeof obj);
    }
  };
  request.send();
};
//AJAX模拟分页操作

getNextPage.onclick = () => {
  let request = new XMLHttpRequest();
  let pageContent = document.querySelector(".pageContent");
  let pageNum = pageContent.getAttribute("data-pageNum") - 0;
  //console.log(pageNum, `/${pageNum + 1}.json`);
  request.open("GET", `/${pageNum + 1}.json`);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let arr = JSON.parse(request.response);
      let result = arr.map((item) => `<li>${item.id}</li>`).join("");
      pageContent.innerHTML = result;
      pageContent.setAttribute("data-pageNum", `${pageNum + 1}`);
    }
  };
  request.send();
};

getPreviousPage.onclick = () => {
  let request = new XMLHttpRequest();
  let pageContent = document.querySelector(".pageContent");
  let pageNum = pageContent.getAttribute("data-pageNum") - 0;
  //console.log(pageNum, `/${pageNum - 1}.json`);
  request.open("GET", `/${pageNum - 1}.json`);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let arr = JSON.parse(request.response);
      let result = arr.map((item) => `<li>${item.id}</li>`).join("");
      pageContent.innerHTML = result;
      pageContent.setAttribute("data-pageNum", `${pageNum - 1}`);
    }
  };
  request.send();
};