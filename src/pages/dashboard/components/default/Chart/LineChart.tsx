import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { useBreakpoints } from 'providers/useBreakPoint';
import { useEffect, useRef, useState } from 'react';
import { getLineChartOptions, optionLinechart } from './chart-data';

const LineChartSection = () => {
  const { up } = useBreakpoints();
  const upLg = up('lg');
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [activeSeriesName, setActiveSeriesName] = useState<string | null>(null);

  useEffect(() => {
    const chartInstance = chartRef.current?.getEchartsInstance();

    const handleMouseOver = (params: echarts.ECElementEvent) => {
      if (params.componentType === 'series' && params.seriesName) {
        setActiveSeriesName(params.seriesName);
      }
    };

    const handleMouseOut = (params: echarts.ECElementEvent) => {
      if (params.componentType === 'series') {
        setActiveSeriesName(null);
      }
    };

    chartInstance?.on('mouseover', handleMouseOver);
    chartInstance?.on('mouseout', handleMouseOut);

    // Cleanup on component unmount
    return () => {
      chartInstance?.off('mouseover', handleMouseOver);
      chartInstance?.off('mouseout', handleMouseOut);
    };
  }, []);

  const options = getLineChartOptions(activeSeriesName);
  const handleLegendToggle = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  //   useEffect(() => {
  //     const instance = chartRef.current?.getEchartsInstance();
  //     if (instance) {
  //       instance.on('mouseover', (params) => {
  //         console.log(params.seriesName, 'dxs');
  //       });
  //     }
  //   }, []);
  return (
    <Card sx={{ height: 1 }}>
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Stack
          direction="row"
          sx={({ spacing }) => ({
            px: spacing(1.5),
            pt: spacing(1.5),
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: spacing(3),
          })}
        >
          <Typography variant="h6">Orders Over Time</Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              Last 12 hours
            </Typography>
            <IconifyIcon
              icon="iconamoon:arrow-down-2-light"
              sx={({ spacing }) => ({ ml: 1, width: spacing(3), height: spacing(3) })}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}
        >
          <Stack
            spacing={{ xs: 0 }}
            sx={{
              px: 1.5,
              gap: { xs: 2, sm: 4 },
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box>
              <Typography variant="h5">645</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Orders on May 22
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">645</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Orders on May 22
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            sx={({ spacing }) => ({
              justifyContent: 'center',
              mt: spacing(2),
              pr: spacing(1),
            })}
          >
            {Array.isArray(optionLinechart.series) &&
              optionLinechart.series
                .filter((series) => typeof series.name === 'string')
                .map((series, i, array) => (
                  <Button
                    size="small"
                    startIcon={
                      <IconifyIcon
                        icon="ic:round-square"
                        color={i === array.length - 1 ? 'primary.main' : 'action.disabled'}
                      />
                    }
                    key={series.name}
                    variant="text"
                    sx={{ color: 'text.secondary' }}
                    onClick={() => handleLegendToggle(series.name as string)}
                  >
                    {series.name}
                  </Button>
                ))}
          </Stack>
        </Stack>
        <Box
          sx={({ spacing, typography }) => ({
            height: typography.pxToRem(300),
            display: 'flex',
            mt: spacing(3),
          })}
        >
          <ReactECharts
            style={{ flex: 1, display: 'flex', alignItems: 'end', overflow: 'visible' }}
            echarts={echarts}
            option={optionLinechart}
            ref={chartRef}
            opts={{ renderer: 'svg' }}
            lazyUpdate={true}

            // sx={{
            //   flex: 1,
            //   display: 'flex',
            //   alignItems: 'end',
            // }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChartSection;
