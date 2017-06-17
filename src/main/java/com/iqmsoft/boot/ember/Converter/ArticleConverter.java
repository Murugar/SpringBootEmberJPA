package com.iqmsoft.boot.ember.Converter;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.iqmsoft.boot.ember.domain.Article;
import com.iqmsoft.boot.ember.domain.ArticleDTO;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

@Component
public class ArticleConverter {

    public Article toArticle(ArticleDTO articleDTO) throws ParseException {
        Article article = new Article();
        if (StringUtils.isNotBlank(articleDTO.getId())) {
            article.setId(Long.valueOf(articleDTO.getId()));
        }
        article.setBody(articleDTO.getBody());
        article.setTitle(articleDTO.getTitle());
        article.setAttachment(articleDTO.getAttachment());
        return article;
    }

    public ArticleDTO fromArticle(Article article) {
        ArticleDTO articleDTO = new ArticleDTO();
        articleDTO.setId(article.getId().toString());
        articleDTO.setBody(article.getBody());
        articleDTO.setTitle(article.getTitle());
        articleDTO.setAttachment(article.getAttachment());
        return articleDTO;
    }

    public Collection<ArticleDTO> fromArticle(Iterator<Article> articleList) {
        ArrayList<ArticleDTO> articleDTOs = new ArrayList<>();
        while (articleList.hasNext()) {
            articleDTOs.add(fromArticle(articleList.next()));
        }
        return articleDTOs;
    }

}