'use strict';

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  authorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.list.authors',
  authorCloudClassCount: 2,
  authorCloudClassPrefix: 'author-size-'
};


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');
  console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks ) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clcikedElement:', clickedElement);
  clickedElement.classList.add('active');
    
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');
  console.log (hrefAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const valueSelector = document.querySelector(hrefAttribute);
  console.log(valueSelector);
  /* [DONE] add class 'active' to the correct article */
  valueSelector.classList.add('active');
}


function generateTitleLinks(customSelector = '') {
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  
  /*[DONE] for each article */
  let html = '';
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  console.log(customSelector);
  console.log(opts.articleSelector);
  console.log(articles);

  for( let article of articles) {
  /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    /*[DONE] find the title element */
    /*[DONE] get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    /*[DONE] create HTML of the link */
    const linkHTML ='<li><a href="#' + articleId + '"><span>'+ articleTitle +'</span></a></li>';
    console.log(linkHTML);
    /*[DONE] insert link into titleList */ 
    html = html + linkHTML;

  }
  titleList.insertAdjacentHTML('afterbegin', html);
}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  console.log(links);
  link.addEventListener('click', titleClickHandler);
}


function calculateTagsParams (tags) {
  const params = {max: 0, min: 99999};
  console.log(params);
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
      console.log(params.max);
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateAuthorParams (authors) {
  const params = {max: 0, min: 99999};
  console.log(params);
  for (let author in authors) {
    console.log(author + 'is used ' + authors[author] + ' times');
    if (authors[author] > params.max) {
      params.max = authors[author];
      console.log(params.max, 'max ilość autorów. ');
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}


function calculateTagClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1);
  console.log ( classNumber);
  return opts.cloudClassPrefix + classNumber;
}
function calculateAuthorClass (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.authorCloudClassCount - 1) + 1);
  console.log ( classNumber);
  return opts.authorCloudClassPrefix + classNumber;
}


function generateTags() {
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  //console.log('articles', articles);
  /*[DONE] START LOOP: for every article: */
  for( let article of articles) {
  /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    console.log('Tags wrapper', tagsWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* [DONE] generate HTML of the link */
      const linkHTML ='<li><a href="#tag-' + tag +'">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      /* [DONE] [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
      /* [DONE] [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        console.log(allTags);
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('afterbegin', html);
  /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  console.log(tagList);
  /* [DONE] [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join('');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
  /* [DONE] [MEW] create variable for all links HTML code */
  let allTagsHTML ='';
  
  /*[NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    /*[NEW] generate code of a linnk and add it to allTagsHTML*/
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('taglinkHTML', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    /*tag + ' (' + allTags[tag] + ') ';*/
    console.log(allTagsHTML);
  }
  console.log(allTagsHTML);
  console.log(allTags);
  tagList.innerHTML = allTagsHTML;
}
generateTags();


function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(t);
  /* [DONE] START LOOP: for each active tag link */
  for(let link of links) {
  /* remove class active */
    link.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks);
  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
  /* [DONE] add class active */
    tagLink.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="'+ tag +'"]');
  console.log(tag);
}


function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for (let link of links) {
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();


function generateAuthors() {
  const allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for( let article of articles) {
  /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(opts.authorSelector);
    console.log('Author Selector', authorWrapper);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get authorTags from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    console.log(authorTags);
    /* [DONE] generate HTML of the link */
    const linkHTML ='<a href="#author-' + authorTags + '"' + '>' + authorTags + '</a>';
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    console.log(html);
    /* [DONE] insert HTML of all the links into the author wrapper */
    authorWrapper.insertAdjacentHTML('afterbegin', html);
    /* [DONE] END LOOP: for every author: */
    if(!allAuthors.hasOwnProperty(authorTags)) {
    /* [DONE] [NEW] add generated code to allTags object */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
      console.log(allAuthors);
    }
  }
  const authorList = document.querySelector(opts.authorsListSelector);
  console.log(authorList);
  console.log(allAuthors);
  const authorParams = calculateAuthorParams(allAuthors);
  console.log('authorParams', authorParams);
  let allAuthorsHTML = '';
  for (let authors in allAuthors) {
    const authorsLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[authors], authorParams) + '" href="#author-' + authors + '">' + authors + '</a></li>';
    console.log(authorsLinkHTML);
    allAuthorsHTML += authorsLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();


function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* [DONE] find all tag links with class active */
  const authorLinksActive = document.querySelectorAll('a.active[href^="#auhtor-"]');
  //console.log(t);
  /* [DONE] START LOOP: for each active tag link */
  for(let authorLinkActive of authorLinksActive) {
  /* [DONE] remove class active */
    authorLinkActive.classList.remove('active');
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);
  /* [DONE] START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
  /* [DONE] add class active */
    authorLink.classList.add('active');
    console.log(authorLink);
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();