'use client';

import { Table } from 'flowbite-react';
import type { IEpisode } from '../interfaces/character';

interface EpisodeTableProps {
  episodeList: IEpisode[] | undefined;
  title: string | undefined;
  secondaryTitle: string;
  onClick: (id: string) => void;
  className?: string;
}

const EpisodeTable = ({
  episodeList,
  title,
  secondaryTitle,
  onClick,
  className,
}: EpisodeTableProps) => {
  return (
    <div className={`${className} w-full sm:w-1/3 flex flex-col`}>
      <h1 className="text-xl font-extrabold dark:text-white">{title}</h1>
      <small className="text-sm ml-2 font-semibold text-gray-500 dark:text-gray-400">
        {secondaryTitle}
      </small>
      <Table striped>
        <Table.Body className="divide-y">
          {episodeList?.length ? (
            episodeList?.map(({ episode, name, air_date: airDate, id }) => (
              <Table.Row
                onClick={() => {
                  onClick?.(id);
                }}
                key={`table1-${id}`}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Table.Cell>
                  <b>{episode}</b> - {name} - {airDate}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row
              key={`table1-empty`}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="text-red-600">
                There is no shared episodes
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
export default EpisodeTable;
