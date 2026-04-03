package com.ucl.ucl.defending;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerDefendingService {

    private final PlayerDefendingRepository repository;

    @Autowired
    public PlayerDefendingService(PlayerDefendingRepository repository) {
        this.repository = repository;
    }

    public List<PlayerDefending> getAll() {
        return repository.findAll();
    }

    public List<PlayerDefending> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerDefending> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerDefending> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerDefending> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerDefending> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerDefending save(PlayerDefending entity) {
        return repository.save(entity);
    }

    public PlayerDefending update(PlayerDefending updated) {
        Optional<PlayerDefending> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerDefending player = existingPlayer.get();

            player.setBallsRecovered(updated.getBallsRecovered());
            player.setTacklesTotal(updated.getTacklesTotal());
            player.setTacklesWon(updated.getTacklesWon());
            player.setTacklesLost(updated.getTacklesLost());
            player.setClearances(updated.getClearances());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
