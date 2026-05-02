package com.ucl.ucl.disciplinary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerDisciplinaryRepository extends JpaRepository<PlayerDisciplinary, Long> {

    List<PlayerDisciplinary> findByTeam(String team);
    List<PlayerDisciplinary> findByNation(String nation);
    List<PlayerDisciplinary> findByPosition(String position);
    List<PlayerDisciplinary> findByTeamAndPosition(String team, String position);

    List<PlayerDisciplinary> findByPlayerNameContainingIgnoreCase(String name);

    Optional<PlayerDisciplinary> findByPlayerNameAndTeam(String playerName, String team);

    @Transactional
    void deleteByPlayerName(String playerName);
}
