package com.ucl.ucl.base;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public abstract class BaseStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "player_name")
    private String playerName;

    @Column(name = "team")
    private String team;

    @Column(name = "position")
    private String position;

    @Column(name = "nation")
    private String nation;


    public Long getId() {
        return id; 
    }
    public void setId(Long id) {
        this.id = id; 
    }

    public String getPlayerName() {
        return playerName; 
    }
    public void setPlayerName(String name) {
        this.playerName = name; 
    }

    public String getTeam() {
        return team; 
    }
    public void setTeam(String team) {
        this.team = team; 
    }

    public String getPosition() {
        return position; 
    }
    public void setPosition(String position) {
        this.position = position; 
    }

    public String getNation() {
        return nation;
    }
    public void setNation(String nation) {
        this.nation = nation;
    }
}