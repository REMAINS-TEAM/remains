import TreeView from '@mui/lab/TreeView';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem from './units/TreeItem';
import { CategoriesTreeType } from './types';
import { Skeleton } from '@mui/lab';
import React from 'react';

export default function CategoriesTree({
  categories,
  isLoading,
}: CategoriesTreeType) {
  if (isLoading) {
    return (
      <>
        {Array.from(new Array(10)).map((_, i) => (
          <Skeleton key={i} sx={{ height: '40px' }} />
        ))}
      </>
    );
  }

  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem
        nodeId="1"
        labelText="All Mail"
        labelIcon={MailIcon}
        onClick={(e) => console.log('e', (e.target as any).value)}
      />
      <TreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
      <TreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
        <TreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        >
          <TreeItem
            nodeId="11"
            labelText="Social"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          >
            <TreeItem
              nodeId="12"
              labelText="Social"
              labelIcon={SupervisorAccountIcon}
              labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
            >
              <TreeItem
                nodeId="13"
                labelText="Social"
                labelIcon={SupervisorAccountIcon}
                labelInfo="90"
                color="#1a73e8"
                bgColor="#e8f0fe"
              />
            </TreeItem>
          </TreeItem>
        </TreeItem>
        <TreeItem
          nodeId="6"
          labelText="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <TreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <TreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </TreeItem>
      <TreeItem nodeId="4" labelText="History" labelIcon={Label} />
    </TreeView>
  );
}
