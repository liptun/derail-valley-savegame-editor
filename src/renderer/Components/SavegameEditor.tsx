import React, { FC, useContext, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";
import { AppContext, SavegameActionType } from "./App";

const Wrapper = styled.div``;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    padding: 15px;
`;
const Box = styled.div`
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const SavegameEditor: FC = () => {
    const [money, setMoney] = useState(0);
    const context = useContext(AppContext);

    useEffect(() => {
        setMoney(context.savegame.Player_money);
    }, [context.savegame.Player_money]);

    return (
        <Wrapper>
            <Grid>
                <Box>
                    <p>Hajs: {context.savegame.Player_money}</p>
                    <input
                        value={money}
                        onChange={(e) =>
                            setMoney(Number(e.currentTarget.value))
                        }
                    />
                    <button
                        onClick={() =>
                            context.savegameDispath({
                                type: SavegameActionType.SetPlayerMoney,
                                payload: { money },
                            })
                        }
                    >
                        Set
                    </button>
                </Box>
                <Box>
                    <p>Hajs: {context.savegame.Player_money}</p>
                </Box>
                <Box>
                    <p>Hajs: {context.savegame.Player_money}</p>
                </Box>
                <Box>
                    <p>Hajs: {context.savegame.Player_money}</p>
                </Box>
            </Grid>
            <ReactJson src={context.savegame} />
        </Wrapper>
    );
};

export default SavegameEditor;
