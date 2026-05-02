package com.ucl.ucl.disciplinary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerDisciplinaryService {

    private final PlayerDisciplinaryRepository repository;

    @Autowired
    public PlayerDisciplinaryService(PlayerDisciplinaryRepository repository) {
        this.repository = repository;
    }

    public List<PlayerDisciplinary> getAll() {
        return repository.findAll();
    }

    public List<PlayerDisciplinary> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerDisciplinary> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerDisciplinary> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerDisciplinary> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerDisciplinary> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerDisciplinary save(PlayerDisciplinary entity) {
        return repository.save(entity);
    }

    public PlayerDisciplinary update(PlayerDisciplinary updated) {
        Optional<PlayerDisciplinary> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerDisciplinary player = existingPlayer.get();
            player.setFoulsCommitted(updated.getFoulsCommitted());
            player.setFoulsSuffered(updated.getFoulsSuffered());
            player.setYellowCards(updated.getYellowCards());
            player.setRedCards(updated.getRedCards());
            player.setMinutesPlayed(updated.getMinutesPlayed());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
