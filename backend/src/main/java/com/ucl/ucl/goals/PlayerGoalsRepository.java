package com.ucl.ucl.goals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerGoalsRepository extends JpaRepository<PlayerGoals, Long> {
    //using spring data
    
    List<PlayerGoals> findByTeam(String team);
    List<PlayerGoals> findByNation(String nation);
    List<PlayerGoals> findByPosition(String position);
    List<PlayerGoals> findByTeamAndPosition(String team, String position);

    List<PlayerGoals> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerGoals> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
