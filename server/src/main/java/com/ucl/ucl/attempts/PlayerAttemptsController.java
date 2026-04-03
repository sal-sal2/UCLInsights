package com.ucl.ucl.attempts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/attempts")
public class PlayerAttemptsController {

    private final PlayerAttemptsService service;

    @Autowired
    public PlayerAttemptsController(PlayerAttemptsService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlayerAttempts> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String position) {

        if (team != null && position != null) {
            return service.getByTeamAndPosition(team, position);
        }
        else if (team != null) {
            return service.getByTeam(team);
        }
        else if (nation != null) {
            return service.getByNation(nation);
        }
        else if (position != null) {
            return service.getByPosition(position);
        }
        if (name != null) {
            return service.searchByName(name);
        } else {
            return service.getAll();
        }
    }

    @PostMapping
    public ResponseEntity<PlayerAttempts> add(@RequestBody PlayerAttempts entity) {
        PlayerAttempts saved = service.save(entity);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PlayerAttempts> update(@RequestBody PlayerAttempts entity) {
        PlayerAttempts result = service.update(entity);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        // Player not found — return 404 with an empty body
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{playerName}")
    public ResponseEntity<String> delete(@PathVariable String playerName) {
        service.deleteByPlayerName(playerName);
        return new ResponseEntity<>("Deleted: " + playerName, HttpStatus.OK);
    }
}
