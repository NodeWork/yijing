1. local stroage
2. offline site
 (manifest="/cache.manifest")

           li
            a(href="#") 系辞上
          li
            a(href="#") 系辞下
          li
            a(href="#") 文言传
          li
            a(href="#") 说卦传
          li
            a(href="/doc/xuguazhuan") 序卦传
          li
            a(href="#") 杂卦传


                input(type="search",class="input-medium search-query", id="searchContent", placeholder="0/1 or name")
    input(type="submit",value="查询", id="searchGua", class="btn btn-danger" )
    span(id="searchResult")