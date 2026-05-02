package com.ucl.ucl.goals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/goals")
public class PlayerGoalsController {

    private final PlayerGoalsService service;

    @Autowired
    public PlayerGoalsController(PlayerGoalsService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlayerGoals> getAll(
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
        else if (name != null) {
            return service.searchByName(name);
        } else {
            return service.getAll();
        }
    }

    @PostMapping
    public ResponseEntity<PlayerGoals> add(@RequestBody PlayerGoals entity) {
        PlayerGoals createdPlayer = service.save(entity);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PlayerGoals> update(@RequestBody PlayerGoals entity) {
        PlayerGoals result = service.update(entity);
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
