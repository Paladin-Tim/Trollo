import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  List,
  Typography,
  Space,
  Statistic,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FieldTimeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "./TimeTracker.scss";

dayjs.extend(duration);

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface TimeEntry {
  id: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  isRunning: boolean;
  duration: number;
  pageId: string;
}

interface TimeTrackerProps {
  pageId?: string;
  pageTitle?: string;
  autoStart?: boolean;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({
  pageId: propPageId,
  pageTitle,
  autoStart = false,
}) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>("");
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (propPageId) {
      setCurrentPageId(propPageId);
    } else {
      const path =
        window.location.pathname.replace(/\//g, "_") || "default_page";
      setCurrentPageId(path);
    }
  }, [propPageId]);

  useEffect(() => {
    const allEntries = localStorage.getItem("timeEntries");
    if (allEntries) {
      const parsedEntries = JSON.parse(allEntries).map((entry: any) => ({
        ...entry,
        startTime: new Date(entry.startTime),
        endTime: entry.endTime ? new Date(entry.endTime) : undefined,
      }));
      const pageEntries = parsedEntries.filter(
        (entry: TimeEntry) => entry.pageId === currentPageId
      );
      setTimeEntries(pageEntries);
    }
  }, [currentPageId]);

  useEffect(() => {
    const allEntries = localStorage.getItem("timeEntries");
    let existingEntries: TimeEntry[] = [];
    if (allEntries) {
      existingEntries = JSON.parse(allEntries);
      const otherEntries = existingEntries.filter(
        (entry: TimeEntry) => entry.pageId !== currentPageId
      );
      const updatedEntries = [...otherEntries, ...timeEntries];
      localStorage.setItem("timeEntries", JSON.stringify(updatedEntries));
    } else {
      localStorage.setItem("timeEntries", JSON.stringify(timeEntries));
    }
  }, [timeEntries, currentPageId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeEntries((prev) =>
        prev.map((entry) =>
          entry.isRunning
            ? { ...entry, duration: Date.now() - entry.startTime.getTime() }
            : entry
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const startNewTimer = (description: string = "New Task") => {
    const newEntry: TimeEntry = {
      id: generateId(),
      description,
      startTime: new Date(),
      isRunning: true,
      duration: 0,
      pageId: currentPageId,
    };
    setTimeEntries((prev) => [...prev, newEntry]);
  };

  const toggleTimer = (id: string) => {
    setTimeEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          if (entry.isRunning) {
            return {
              ...entry,
              isRunning: false,
              endTime: new Date(),
            };
          } else {
            return {
              ...entry,
              isRunning: true,
              startTime: new Date(Date.now() - entry.duration),
            };
          }
        }
        return entry;
      })
    );
  };

  const deleteEntry = (id: string) => {
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const editEntry = (entry: TimeEntry) => {
    setEditingEntry(entry);
    form.setFieldsValue({ description: entry.description });
    setIsModalVisible(true);
  };

  const handleEditSave = () => {
    form.validateFields().then((values) => {
      if (editingEntry) {
        setTimeEntries((prev) =>
          prev.map((entry) =>
            entry.id === editingEntry.id
              ? { ...entry, description: values.description }
              : entry
          )
        );
        setIsModalVisible(false);
        setEditingEntry(null);
        form.resetFields();
      }
    });
  };

  const formatDuration = (milliseconds: number): string => {
    const dur = dayjs.duration(milliseconds);
    const hours = Math.floor(dur.asHours());
    const minutes = dur.minutes();
    const seconds = dur.seconds();
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatCompactTime = (date: Date): string => {
    return dayjs(date).format("HH:mm");
  };

  const getPageStats = () => {
    const pageEntries = timeEntries.filter(
      (entry) => entry.pageId === currentPageId
    );
    const totalTime = pageEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0
    );
    const activeEntries = pageEntries.filter((entry) => entry.isRunning).length;
    const completedEntries = pageEntries.filter(
      (entry) => !entry.isRunning
    ).length;
    return {
      totalTime,
      activeEntries,
      completedEntries,
      totalEntries: pageEntries.length,
    };
  };

  const getAllPages = (): string[] => {
    const allEntries = localStorage.getItem("timeEntries");
    if (!allEntries) return [currentPageId];
    const entries: TimeEntry[] = JSON.parse(allEntries);
    const pageIds = [...new Set(entries.map((entry) => entry.pageId))];
    return pageIds.length > 0 ? pageIds : [currentPageId];
  };

  const switchPage = (newPageId: string) => {
    setCurrentPageId(newPageId);
  };

  const stats = getPageStats();

  return (
    <div className="bid__time-tracker">
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {/* Compact Header */}
        <Card size="small" bodyStyle={{ padding: "12px 16px" }}>
          <Row align="middle" gutter={[16, 8]}>
            <Col flex="auto">
              <Space>
                <FieldTimeOutlined style={{ fontSize: "16px" }} />
                <Text strong style={{ fontSize: "14px" }}>
                  Трекер
                </Text>
                <Tag color="blue" style={{ fontSize: "12px", margin: 0 }}>
                  {currentPageId.replace(/_/g, "/")}
                </Tag>
                {pageTitle && (
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {pageTitle}
                  </Text>
                )}
              </Space>
            </Col>
            <Col>
              <Space wrap>
                <Tooltip title="Добавить новый таймер">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => startNewTimer()}
                  >
                    Новый таймер
                  </Button>
                </Tooltip>
              </Space>
              {/* <Select
                value={currentPageId}
                onChange={switchPage}
                size="small"
                style={{ width: 150 }}
                dropdownMatchSelectWidth={false}
              >
                {getAllPages().map((pageId) => (
                  <Option key={pageId} value={pageId}>
                    {pageId.replace(/_/g, " / ")}
                  </Option>
                ))}
              </Select> */}
            </Col>
          </Row>
        </Card>

        {/* Compact Stats */}
        <Card size="small" bodyStyle={{ padding: "12px 16px" }}>
          <Row gutter={[16, 8]} justify="space-between">
            <Col>
              <Statistic
                title="Времени затрачено"
                value={formatDuration(stats.totalTime)}
                valueStyle={{ fontSize: "14px" }}
                titleStyle={{ fontSize: "12px" }}
              />
            </Col>
            <Col>
              <Statistic
                title="Активные"
                value={stats.activeEntries}
                valueStyle={{ fontSize: "14px" }}
                titleStyle={{ fontSize: "12px" }}
              />
            </Col>
            <Col>
              <Statistic
                title="Завершенные"
                value={stats.completedEntries}
                valueStyle={{ fontSize: "14px" }}
                titleStyle={{ fontSize: "12px" }}
              />
            </Col>
            <Col>
              <Statistic
                title="Всего задач"
                value={stats.totalEntries}
                valueStyle={{ fontSize: "14px" }}
                titleStyle={{ fontSize: "12px" }}
              />
            </Col>
          </Row>
        </Card>

        {/* Compact Controls */}
        {/* <Card size="small" bodyStyle={{ padding: "12px 16px" }}>
          <Space wrap>
            <Tooltip title="Добавить новый таймер">
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => startNewTimer()}
              >
                Новый таймер
              </Button>
            </Tooltip>
            <Button
              size="small"
              onClick={() => {
                Modal.confirm({
                  title: "Start Timer with Description",
                  content: (
                    <Input
                      placeholder="Enter task description"
                      size="small"
                      onPressEnter={(e) => {
                        startNewTimer(e.currentTarget.value);
                        Modal.destroyAll();
                      }}
                    />
                  ),
                  onOk: () => {
                    const input = document.querySelector(
                      'input[placeholder="Enter task description"]'
                    ) as HTMLInputElement;
                    if (input?.value) {
                      startNewTimer(input.value);
                    }
                  },
                });
              }}
            >
              Add with Description
            </Button>
          </Space>
        </Card> */}

        {/* Compact List */}
        <Card
          size="small"
          title={`Таймеры (${timeEntries.filter((entry) => entry.pageId === currentPageId).length})`}
          bodyStyle={{ padding: "8px 0" }}
        >
          <List
            size="small"
            dataSource={timeEntries.filter(
              (entry) => entry.pageId === currentPageId
            )}
            renderItem={(entry) => (
              <List.Item
                style={{ padding: "8px 16px" }}
                actions={[
                  <Tooltip title={entry.isRunning ? "Пауза" : "Продолжить"}>
                    <Button
                      type="text"
                      size="small"
                      icon={
                        entry.isRunning ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                      onClick={() => toggleTimer(entry.id)}
                    />
                  </Tooltip>,
                  <Tooltip title="Редактировать">
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => editEntry(entry)}
                    />
                  </Tooltip>,
                  <Tooltip title="Удалить">
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteEntry(entry.id)}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space size="small">
                      <Text style={{ fontSize: "13px" }}>
                        {entry.description}
                      </Text>
                      {entry.isRunning ? (
                        <Tag
                          color="green"
                          style={{ fontSize: "10px", margin: 0 }}
                        >
                          Идет
                        </Tag>
                      ) : (
                        <Tag
                          color="blue"
                          style={{ fontSize: "10px", margin: 0 }}
                        >
                          На паузе
                        </Tag>
                      )}
                    </Space>
                  }
                  description={
                    <Space size="small" style={{ fontSize: "11px" }}>
                      <Text type="secondary">
                        {formatCompactTime(entry.startTime)}
                      </Text>
                      {entry.endTime && (
                        <>
                          <Text type="secondary">-</Text>
                          <Text type="secondary">
                            {formatCompactTime(entry.endTime)}
                          </Text>
                        </>
                      )}
                      <Text strong>{formatDuration(entry.duration)}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "Нет таймеров. Создайте первый!" }}
          />
        </Card>
      </Space>

      <Modal
        title="Редактировать описание задачи"
        open={isModalVisible}
        onOk={handleEditSave}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingEntry(null);
          form.resetFields();
        }}
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              { required: true, message: "Пожалуйста введите описание задачи" },
            ]}
          >
            <TextArea rows={2} placeholder="Введите описание задачи" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TimeTracker;
