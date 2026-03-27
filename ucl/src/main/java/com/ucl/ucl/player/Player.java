package com.ucl.ucl.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "ucl_player_goals_stats")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_name")
    private String playerName;
    private String team;
    private String position;
    private String nation;
    private Integer goals;
    private Integer goalsRightFoot;
    private Integer goalsLeftFoot;
    private Integer goalsHead;
    private Integer goalsOther;
    private Integer goalsInsideArea;
    private Integer goalsOutsideArea;
    private Integer penaltiesScored;
    private Integer matchesPlayed;



    public Player(){

    }

    public Player(String playerName){
        this.playerName = playerName;
    }

    public Player(Long id, String playerName, String team, String position, String nation, Integer goals, Integer goalsRightFoot, Integer goalsLeftFoot, Integer goalsHead, Integer goalsOther, Integer goalsInsideArea, Integer goalsOutsideArea, Integer penaltiesScored, Integer matchesPlayed){
        this.id = id;
        this.playerName = playerName;
        this.team = team;
        this.position = position;
        this.nation = nation;
        this.goals = goals;
        this.goalsRightFoot = goalsRightFoot;
        this.goalsLeftFoot = goalsLeftFoot;
        this.goalsHead = goalsHead;
        this.goalsOther = goalsOther;
        this.goalsInsideArea = goalsInsideArea;
        this.goalsOutsideArea = goalsOutsideArea;
        this.penaltiesScored = penaltiesScored;
        this.matchesPlayed = matchesPlayed;

    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getTeam() {
        return team;
    }
    public void setTeam(String team) {
        this.team = team;
    }

    public String getPosition(){
        return position;
    }

    public void setPosition(String position){
        this.position = position;
    }

    public String getNation(){
        return nation;
    }

    public void setNation(String nation){
        this.nation = nation;
    }

    public Integer getGoals() {
        return goals;
    }
    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getGoalsRightFoot() {
        return goalsRightFoot;
    }
    public void setGoalsRightFoot(Integer goalsRightFoot) {
        this.goalsRightFoot = goalsRightFoot;
    }

    public Integer getGoalsLeftFoot() {
        return goalsLeftFoot;
    }
    public void setGoalsLeftFoot(Integer goalsLeftFoot) {
        this.goalsLeftFoot = goalsLeftFoot;
    }

    public Integer getGoalsHead() {
        return goalsHead;
    }
    public void setGoalsHead(Integer goalsHead) {
        this.goalsHead = goalsHead;
    }

    public Integer getGoalsOther() {
        return goalsOther;
    }
    public void setGoalsOther(Integer goalsOther) {
        this.goalsOther = goalsOther;
    }

    public Integer getGoalsInsideArea() {
        return goalsInsideArea;
    }
    public void setGoalsInsideArea(Integer goalsInsideArea) {
        this.goalsInsideArea = goalsInsideArea;
    }

    public Integer getGoalsOutsideArea() {
        return goalsOutsideArea;
    }
    public void setGoalsOutsideArea(Integer goalsOutsideArea) {
        this.goalsOutsideArea = goalsOutsideArea;
    }

    public Integer getPenaltiesScored() {
        return penaltiesScored;
    }
    public void setPenaltiesScored(Integer penaltiesScored) {
        this.penaltiesScored = penaltiesScored;
    }

    public Integer getMatchesPlayed() {
        return matchesPlayed;
    }
    public void setMatchesPlayed(Integer matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }
}
