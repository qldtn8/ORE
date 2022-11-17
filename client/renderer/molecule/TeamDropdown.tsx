import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  TeamUserType,
  SearchMenues,
  ServerRoleMenues,
  TeamRoleMenues,
} from "../types";
import { useAppSelector } from "../hooks/reduxHook";

interface SearchDropDownProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  MenuItems: SearchMenues | ServerRoleMenues | TeamRoleMenues;
  member?: TeamUserType;
  teamMembers?: Array<TeamUserType>;
  disabled?: boolean;
}

export default function TeamDropDown(props: SearchDropDownProps) {
  const userProfile = useAppSelector(
    (state) => state.userProfileState
  ).userProfileState;
  const currentTeamIdx = useAppSelector(
    (state) => state.myTeamsState.selectTeamState
  ).idx;
  const myTeam = useAppSelector((state) => state.myTeamsState).myTeamsState;
  const currentTeamRole =
    currentTeamIdx === -1 ? undefined : myTeam[currentTeamIdx].teamUserRole;
  const originalRole = useMemo(() => {
    return props.category;
  }, []);
  const [disabled, SetDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (props.disabled !== undefined) {
      SetDisabled(props.disabled);
    }
  }, [props.disabled]);

  const categoryChange = (event: SelectChangeEvent) => {
    const cantChangeOwner: boolean =
      originalRole === "OWNER" || event.target.value === "OWNER";
    const cantChangeSameRole: boolean =
      currentTeamRole === undefined
        ? userProfile.role === originalRole
        : currentTeamRole === originalRole;
    const cantChangeLeader: boolean =
      originalRole === "LEADER" && userProfile.role !== "OWNER";
    if (cantChangeOwner || cantChangeSameRole || cantChangeLeader) {
      alert("권한을 변경할 수 없습니다.");
      return;
    }
    props.setCategory(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 100, height: 38 }}>
        <Select
          id="demo-simple-select"
          value={
            props.member !== undefined ? props.member.role : props.category
          }
          onChange={(event) => {
            categoryChange(event);
          }}
          disabled={disabled}
        >
          {Object.entries(props.MenuItems).map((item, idx) => (
            <MenuItem value={item[0]} key={idx}>
              {item[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
