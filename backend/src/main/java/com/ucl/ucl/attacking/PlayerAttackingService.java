package com.ucl.ucl.attacking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerAttackingService {

    private final PlayerAttackingRepository repository;

    @Autowired
    public PlayerAttackingService(PlayerAttackingRepository repository) {
        this.repository = repository;
    }

    public List<PlayerAttacking> getAll() {
        return repository.findAll();
    }

    public List<PlayerAttacking> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerAttacking> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerAttacking> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerAttacking> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerAttacking> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerAttacking save(PlayerAttacking entity) {
        return repository.save(entity);
    }

    public PlayerAttacking update(PlayerAttacking updated) {
        Optional<PlayerAttacking> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerAttacking player = existingPlayer.get();
            
            player.setAssists(updated.getAssists());
            player.setCorners(updated.getCorners());
            player.setOffsides(updated.getOffsides());
            player.setDribbles(updated.getDribbles());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
