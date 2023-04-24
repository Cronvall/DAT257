import React from "react";
import styles from "./styles/sampleLeague.module.css";
import { Table } from "@nextui-org/react";

export default function SampleLeague() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leagueContainer}>
                <Table>
                    <Table.Header>
                        <Table.Column>RANK</Table.Column>
                        <Table.Column>USERNAME</Table.Column>
                        <Table.Column>PROFIT</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>user1</Table.Cell>
                            <Table.Cell>$1000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>user2</Table.Cell>
                            <Table.Cell>$900</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <div className={styles.textPitch}>
                <h2>Why Wall St. Warriors?</h2>
                <p>Join a league and compete with your friends to see who can make the most money.</p>
            </div>
        </div>
    );
};
