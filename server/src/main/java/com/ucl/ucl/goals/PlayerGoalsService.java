package com.ucl.ucl.goals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PlayerGoalsService {

    private final PlayerGoalsRepository repository;

    @Autowired
    public PlayerGoalsService(PlayerGoalsRepository repository) {
        this.repository = repository;
    }

    public List<PlayerGoals> getAll() {
        return repository.findAll();
    }

    public List<PlayerGoals> getByTeam(String team) {
        return repository.findByTeam(team);
    }

    public List<PlayerGoals> getByNation(String nation) {
        return repository.findByNation(nation);
    }

    public List<PlayerGoals> getByPosition(String position) {
        return repository.findByPosition(position);
    }

    public List<PlayerGoals> getByTeamAndPosition(String team, String position) {
        return repository.findByTeamAndPosition(team, position);
    }

    public List<PlayerGoals> searchByName(String name) {
        return repository.findByPlayerNameContainingIgnoreCase(name);
    }

    public PlayerGoals save(PlayerGoals entity) {
        return repository.save(entity);
    }


    public PlayerGoals update(PlayerGoals updated) {
        Optional<PlayerGoals> existingPlayer = repository.findByPlayerNameAndTeam(updated.getPlayerName(), updated.getTeam());

        if (existingPlayer.isPresent()) {
            PlayerGoals player = existingPlayer.get();
            player.setGoals(updated.getGoals());
            player.setGoalsRightFoot(updated.getGoalsRightFoot());
            player.setGoalsLeftFoot(updated.getGoalsLeftFoot());
            player.setGoalsHead(updated.getGoalsHead());
            player.setGoalsOther(updated.getGoalsOther());
            player.setGoalsInsideArea(updated.getGoalsInsideArea());
            player.setGoalsOutsideArea(updated.getGoalsOutsideArea());
            player.setPenaltiesScored(updated.getPenaltiesScored());
            player.setMatchesPlayed(updated.getMatchesPlayed());
            return repository.save(player);
        }
        return null;
    }

    @Transactional
    public void deleteByPlayerName(String playerName) {
        repository.deleteByPlayerName(playerName);
    }
}
