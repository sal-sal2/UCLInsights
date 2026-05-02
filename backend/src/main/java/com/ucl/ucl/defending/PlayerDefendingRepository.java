package com.ucl.ucl.defending;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public interface PlayerDefendingRepository extends JpaRepository<PlayerDefending, Long> {

    List<PlayerDefending> findByTeam(String team);
    List<PlayerDefending> findByNation(String nation);
    List<PlayerDefending> findByPosition(String position);
    List<PlayerDefending> findByTeamAndPosition(String team, String position);

    List<PlayerDefending> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerDefending> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
