import { getCurrentUser } from "@/services/auth.service";
import React, { ReactNode, useState } from "react";
import { Grid } from "@nextui-org/react";


const MyStats = () => {

    interface Props {
        children: ReactNode;
    }

    const HeaderTxt = ({ children }: Props) => {
        return(
                <h3
                style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "black",
                }}>
                    {children}
                </h3>
        )
    };

    const ValueTxt = ({ children }: Props) => {
        return(
                <p
                style={{
                    fontSize: "1.25rem",
                    fontWeight: "300",
                    color: "black",
                }}>
                    {children}
                </p>
        )
    };
            

    return (
        <>
            <Grid.Container 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    width: "75%",
                    maxWidth: "100%",
                    rowGap: "4rem",
                    padding: "2rem",
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Grid>
                    <div>
                        <HeaderTxt>net returns %</HeaderTxt>
                        <ValueTxt>5.23%</ValueTxt>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <HeaderTxt>Worst performing stock</HeaderTxt>
                        <ValueTxt>AMZN (-26,6%)</ValueTxt>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <HeaderTxt>Best performing stock</HeaderTxt>
                        <ValueTxt>APPL (+22,61%)</ValueTxt>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <HeaderTxt>net returns %</HeaderTxt>
                        <ValueTxt>5.23%</ValueTxt>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <HeaderTxt>Worst performing stock</HeaderTxt>
                        <ValueTxt>AMZN (-26,6%)</ValueTxt>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <HeaderTxt>Best performing stock</HeaderTxt>
                        <ValueTxt>APPL (+22,61%)</ValueTxt>
                    </div>
                </Grid>
            </Grid.Container>
        </>
    );
        
}


export default MyStats;