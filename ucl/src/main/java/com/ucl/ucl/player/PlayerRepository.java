package com.ucl.ucl.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Transactional
    void deleteByPlayerName(String playerName);
    Optional<Player> findByPlayerName(String playerName);

    
}