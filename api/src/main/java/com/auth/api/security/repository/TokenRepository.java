package com.auth.api.security.repository;

import com.auth.api.security.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM Token t INNER JOIN User u ON t.user.id = u.id WHERE t.user.id = :userId AND loggedOut = false")
    List<Token> findAllAccessTokenByUser(Long userId);

    Optional<Token> findByAccessToken(String token);

    @Query("SELECT t FROM Token t INNER JOIN User u ON t.user.id = u.id WHERE t.user.id = :userId AND t.refreshToken = :token AND loggedOut = false")
    Optional<Token> findByRefreshToken(String token, Long userId);
}
