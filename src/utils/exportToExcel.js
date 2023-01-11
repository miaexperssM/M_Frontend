import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Tooltip, Button } from 'antd';

export const ExportToExcel = ({ apiData, notice, fileName, setIsLoading }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const dataFilter = apiData => {
    return apiData.map(item => {
      const { id, isDeleted, createdBy, zone, zoneId, placeIdInGoogle, expiredDate, ...filteredData } = item;
      return {
        ...filteredData,
        zone_Name: zoneId !== -1 && zoneId !== 0 && zone && zone.title ? zone.title : 'Not Found',
        zone_Description: zoneId !== -1 && zoneId !== 0 && zone && zone.description ? zone.description : 'Not Found',
      };
    });
  };

  const exportToCSV = (apiData, fileName) => {
    setIsLoading(true);
    const filteredData = dataFilter(apiData);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    setIsLoading(false);
  };

  return (
    <Tooltip placement="right" title={notice}>
      <Button disabled={apiData.length == 0 ? true : false} onClick={e => exportToCSV(apiData, fileName)}>
        Export
      </Button>
    </Tooltip>
  );
};
