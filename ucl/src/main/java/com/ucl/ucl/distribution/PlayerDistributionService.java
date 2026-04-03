package com.ucl.ucl.distribution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerDistributionService {

    private final PlayerDistributionRepository repository;

    @Autowired
    public PlayerDistributionService(PlayerDistributionRepository repository) {
        this.repository = repository;
    }

    public List<PlayerDistribution> getAll() {
        return repository.findAll();
    }

    public List<PlayerDistribution> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerDistribution> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerDistribution> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerDistribution> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerDistribution> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerDistribution save(PlayerDistribution entity) {
        return repository.save(entity);
    }

 
    public PlayerDistribution update(PlayerDistribution updated) {
        Optional<PlayerDistribution> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerDistribution player = existingPlayer.get();
            player.setPassAccuracy(updated.getPassAccuracy());
            player.setPassesAttempted(updated.getPassesAttempted());
            player.setPassesCompleted(updated.getPassesCompleted());
            player.setCrossAccuracy(updated.getCrossAccuracy());
            player.setCrossesAttempted(updated.getCrossesAttempted());
            player.setCrossesCompleted(updated.getCrossesCompleted());
            player.setFreeKicks(updated.getFreeKicks());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
