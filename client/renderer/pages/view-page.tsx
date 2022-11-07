import styled from "@emotion/styled";
import React, { useState } from "react";
import DatePicker from "../atom/DatePicker";
import Input from "../atom/Input";
import List from "../atom/List";
import RadioButton from "../atom/RadioButton";
import Table from "../atom/Table";
import Text from "../atom/Text";
import { Button } from "../styles";
import { TagType } from "../types";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TagContainer = styled.div`
  padding: 20px;
`;

const Component: {
  [key: string]: React.FunctionComponent<{ [key: string]: any }>;
} = {
  text: Text,
  list: List,
  input: Input,
  table: Table,
  "radio button": RadioButton,
  "date picker": DatePicker,
};

const arr = [
  {
    type: "text",
    tagProps: {
      children: "A504팀 MVP",
      style: {
        width: "",
        height: "",
        color: "black",
        fontSize: "30px",
        fontWeight: "500",
      },
    },
  },
  {
    type: "radio button",
    tagProps: {
      type: "radio",
      header: "A504 MVP",
      name: "radio",
      label: ["동윤", "민지", "창엽", "수빈", "민석"],
      style: { width: "", height: "" },
    },
  },
  {
    type: "input",

    tagProps: {
      header: "MVP 선정 이유",
      placeholder: "내용을 입력하세요",
      style: {
        width: "200px",
        height: "30px",
      },
    },
  },
  {
    type: "input",

    tagProps: {
      header: "기타 건의사항",
      placeholder: "내용을 입력하세요",
      style: {
        width: "200px",
        height: "30px",
      },
    },
  },
  {
    type: "date picker",
    tagProps: {
      type: "date",
      header: "투표 날짜를 기입하세요",
      style: { width: "200px", height: "" },
    },
  },
];
const tmp = JSON.stringify(arr);

export default function ViewPage() {
  const [pageTagList, _] = useState<TagType[]>(JSON.parse(tmp));
  const [userInput, setUserInput] = useState<any>({});
  console.log(JSON.stringify(userInput));
  return (
    <Container>
      {pageTagList.length > 0 &&
        pageTagList.map((v, index) => {
          const TagComponent = Component[v.type];
          return (
            TagComponent !== undefined && (
              <TagContainer key={`${v.type}-${index}`}>
                <TagComponent {...{ ...v.tagProps, userInput, setUserInput }} />
              </TagContainer>
            )
          );
        })}
      <Button width="100px" height="50px">
        저장
      </Button>
    </Container>
  );
}
