package com.ucl.ucl.attacking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public interface PlayerAttackingRepository extends JpaRepository<PlayerAttacking, Long> {

    List<PlayerAttacking> findByTeam(String team);
    List<PlayerAttacking> findByNation(String nation);
    List<PlayerAttacking> findByPosition(String position);
    List<PlayerAttacking> findByTeamAndPosition(String team, String position);

    List<PlayerAttacking> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerAttacking> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
