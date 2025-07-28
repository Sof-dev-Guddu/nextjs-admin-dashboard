"use client"
import AppealTable, { AppealTableProps } from "@/components/features/appeal/appeal-table/table/AppealTable";
import { withRedux } from "@/hoc/withRedux";

const AppealTableWithRedux = withRedux<AppealTableProps>(AppealTable)

export default AppealTableWithRedux