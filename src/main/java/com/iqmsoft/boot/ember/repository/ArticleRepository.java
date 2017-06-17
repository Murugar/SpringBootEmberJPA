package com.iqmsoft.boot.ember.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.iqmsoft.boot.ember.domain.Article;

@Transactional
public interface ArticleRepository extends JpaRepository<Article, Long> {
}