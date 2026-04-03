package com.ucl.ucl.defending;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/defending")
public class PlayerDefendingController {

    private final PlayerDefendingService service;

    @Autowired
    public PlayerDefendingController(PlayerDefendingService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlayerDefending> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String position) {

        // Evaluate filters in priority order — most specific first
        if (team != null && position != null) {
            return service.getByTeamAndPosition(team, position);
        }
        if (team != null) {
            return service.getByTeam(team);
        }
        if (nation != null) {
            return service.getByNation(nation);
        }
        if (position != null) {
            return service.getByPosition(position);
        }
        if (name != null) {
            return service.searchByName(name);
        } else {
            return service.getAll();

        }
    }

    @PostMapping
    public ResponseEntity<PlayerDefending> add(@RequestBody PlayerDefending entity) {
        PlayerDefending saved = service.save(entity);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PlayerDefending> update(@RequestBody PlayerDefending entity) {
        PlayerDefending result = service.update(entity);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> delete(@PathVariable String playerName) {
        service.deleteByPlayerName(playerName);
        return new ResponseEntity<>("Deleted: " + playerName, HttpStatus.OK);
    }
}
