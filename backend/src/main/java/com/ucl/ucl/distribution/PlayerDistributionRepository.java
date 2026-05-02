package com.ucl.ucl.distribution;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerDistributionRepository extends JpaRepository<PlayerDistribution, Long> {

    List<PlayerDistribution> findByTeam(String team);
    List<PlayerDistribution> findByNation(String nation);
    List<PlayerDistribution> findByPosition(String position);
    List<PlayerDistribution> findByTeamAndPosition(String team, String position);

    List<PlayerDistribution> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerDistribution> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
