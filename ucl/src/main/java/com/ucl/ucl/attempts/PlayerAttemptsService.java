package com.ucl.ucl.attempts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerAttemptsService {

    private final PlayerAttemptsRepository repository;

    @Autowired
    public PlayerAttemptsService(PlayerAttemptsRepository repository) {
        this.repository = repository;
    }

    public List<PlayerAttempts> getAll() {
        return repository.findAll();
    }

    public List<PlayerAttempts> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerAttempts> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerAttempts> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerAttempts> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerAttempts> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerAttempts save(PlayerAttempts entity) {
        return repository.save(entity);
    }


    public PlayerAttempts update(PlayerAttempts updated) {
        Optional<PlayerAttempts> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerAttempts player = existingPlayer.get();
            player.setAttemptsTotal(updated.getAttemptsTotal());
            player.setAttemptsOnTarget(updated.getAttemptsOnTarget());
            player.setAttemptsOffTarget(updated.getAttemptsOffTarget());
            player.setAttemptsBlocked(updated.getAttemptsBlocked());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
