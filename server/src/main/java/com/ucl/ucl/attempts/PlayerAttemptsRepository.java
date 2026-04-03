package com.ucl.ucl.attempts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public interface PlayerAttemptsRepository extends JpaRepository<PlayerAttempts, Long> {

    List<PlayerAttempts> findByTeam(String team);
    List<PlayerAttempts> findByNation(String nation);
    List<PlayerAttempts> findByPosition(String position);
    List<PlayerAttempts> findByTeamAndPosition(String team, String position);

    List<PlayerAttempts> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerAttempts> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
