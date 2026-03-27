package com.ucl.ucl.player;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    // Get all players
    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    // Get all players from a specific team
    public List<Player> getPlayersFromTeam(String teamName) {  // teamName was missing as parameter
        return playerRepository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam()))
                .collect(Collectors.toList());
    }

    // Search players by name (case-insensitive)
    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayerName().toLowerCase()  // getName() -> getPlayerName()
                        .contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Search players by position
    public List<Player> getPlayersByPos(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition().toLowerCase()  // getPos() -> getPosition()
                        .contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Search players by nation
    public List<Player> getPlayersByNation(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation().toLowerCase()
                        .contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Get players filtered by both team and position
    public List<Player> getPlayersByTeamAndPosition(String team, String position) {
        return playerRepository.findAll().stream()
                .filter(player -> team.equals(player.getTeam())
                        && position.equals(player.getPosition()))  // getPos() -> getPosition()
                .collect(Collectors.toList());
    }

    // Add a new player
    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    // Update an existing player by name
    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayer = playerRepository
                .findByPlayerName(updatedPlayer.getPlayerName());  // findByName() -> findByPlayerName()

        if (existingPlayer.isPresent()) {
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setPlayerName(updatedPlayer.getPlayerName());  // setName() -> setPlayerName()
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setPosition(updatedPlayer.getPosition());  // setPos() -> setPosition()
            playerToUpdate.setNation(updatedPlayer.getNation());
            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    // Delete a player by name
    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByPlayerName(playerName);  // deleteByName() -> deleteByPlayerName()
    }
}