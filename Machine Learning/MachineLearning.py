"""
DecisionTree algorithm to predict whether a patient has high or low cholesterol
FIT3077 Assignment 2 - Bonus Task
"""

import math


def read_patientFile(filename):
    """
    reads the raw data of a patient file and converts it into binary format
    @param filename: file containing raw data
    """
    input_file = open(filename,'r')
    data_file = input_file.readlines()
    input_file.close()

    X_data = []  # predictors data
    Y_data = []  # output data (high/low cholesterol)

    for line in data_file:
        line = line[1:-2]
        line_elements = line.strip().split(', ')

        index = 0
        temporary_array = []
        for element in line_elements:
            if index != 3:
                element = float(element)

            if index == 0:  # BMI
                if element >= 25:
                    binary_value = 1
                else:
                    binary_value = 0
            elif index == 1:  # Blood sugar
                if element >= 100:
                    binary_value = 1
                else:
                    binary_value = 0
            elif index == 2:  # Age
                if element >= 60:
                    binary_value = 1
                else:
                    binary_value = 0
            elif index == 3:  # Gender
                if element == "'male'":
                    binary_value = 1
                else:
                    binary_value = 0
            else:
                if element >= 200:  # Total cholesterol
                    binary_value = 1
                else:
                    binary_value = 0
            temporary_array.append(binary_value)
            index += 1
        X_data.append(temporary_array[:-1])
        Y_data.append(int(temporary_array[-1]))

    # text = ""
    # for j in range(len(X_data)):
    #     line = str(X_data[j]).strip('[]')
    #     line = ''.join(line.split())
    #     line += "," + str(Y_data[j])
    #     text += line + "\n"
    #
    # output_file = "binary_data.txt"
    # f = open(output_file, "w+")
    # f.write(text)
    # f.close()

    return X_data, Y_data


"""
Note: Part of the Machine Learning Algorithm below has been used in a previous unit (FIT3080) by one of the students
working on this assignment and has been adapted from there.
"""


class Node:
    """
    Decision tree node
    """
    def __init__(self, attribute=None, left=None, right=None, label=None):
        """
        @param attribute: the attribute of the node(index in the binary file)
        @param left: left child of node
        @param right: right child of node
        @param label: represents the answer in binary form (0 if low cholesterol, 1 if high cholesterol)
        """
        self.attribute = attribute
        self.left = left
        self.right = right
        self.label = label


class DecisionTree:
    """
    Builds a decision tree using patient training data and the tree can be used to predict if a patient has high/low
    cholesterol
    """
    def __init__(self):
        self.root = None

    def calculate_entropy(self, pos, neg):
        """
        Calculates the entropy given the number of positives and negatives in a binary data set
        @param pos: number of positives(1s)
        @param neg: number of negatives(0s)
        @return: entropy value
        """
        if pos == 0 or neg == 0:  # No entropy
            return 0
        total = pos + neg
        entropy = -((pos/total) * math.log(pos/total, 2)) - ((neg/total) * math.log(neg/total, 2))
        return entropy

    def calculate_systemEntropy(self, Y_train):
        """
        Calculates the total entropy of training data
        @param Y_train: output training data values of training data
        @return: entropy of system
        """
        total_pos = 0
        total_neg = 0

        for m in range(len(Y_train)):
            if Y_train[m] == 0:
                total_neg += 1
            elif Y_train[m] == 1:
                total_pos += 1
        S_entropy = self.calculate_entropy(total_pos, total_neg)
        return S_entropy

    def calculate_InfoGain(self, X_train, Y_train):
        """
        Calculates the information gain of a given set of data and returns the attribute and its max information gain for that set of data
        @param X_train: input train data used to calculate information gain for that set of data
        @param Y_train: expected outcome train data
        @return: max information gain along with the corresponding attribute
        """
        S_entropy = self.calculate_systemEntropy(Y_train)
        length = len(Y_train)

        # Keeping track of the amount of times a positive(1)/negative(0) gives the label positive(1), negative(0) for each column of data.
        negativeGivesPositive = 0
        negativeGivesNegative = 0
        positiveGivesPositive = 0
        positiveGivesNegative = 0

        max_info_gain = -math.inf
        index = -math.inf
        if len(X_train) > 0:
            for j in range(len(X_train[0])):
                for i in range(len(X_train)):
                    if X_train[i][j] == 0:
                        if Y_train[i] == 0:
                            negativeGivesNegative += 1
                        elif Y_train[i] == 1:
                            negativeGivesPositive += 1
                    elif X_train[i][j] == 1:
                        if Y_train[i] == 0:
                            positiveGivesNegative += 1
                        elif Y_train[i] == 1:
                            positiveGivesPositive += 1
                info_gain = S_entropy - (((negativeGivesNegative+negativeGivesPositive)/length) * self.calculate_entropy(negativeGivesPositive, negativeGivesNegative)) - (((positiveGivesNegative + positiveGivesPositive) / length) * self.calculate_entropy(positiveGivesPositive, positiveGivesNegative))

                # Resetting variables
                negativeGivesPositive = 0
                negativeGivesNegative = 0
                positiveGivesPositive = 0
                positiveGivesNegative = 0

                if info_gain > max_info_gain:
                    max_info_gain = info_gain
                    index = j

        return index, max_info_gain

    def train(self, X_train, Y_train):
        """
        builds up the DecisionTree
        @param X_train: input train data
        @param Y_train: expected outcome train data
        @return: None
        """
        index, max_info_gain = self.calculate_InfoGain(X_train, Y_train)

        self.root = Node(index)
        self.split(X_train, Y_train, self.root)  # start of recursive call

    def split(self, X_train, Y_train, node):
        """
        recursive function to split data by using a information gain heuristic approach for choosing next attribute
        @param X_train: input train data
        @param Y_train: expected outcome train data
        @param node: the node we are currently splitting
        @return: None
        """
        positives = 0
        negatives = 0
        for i in range(len(Y_train)):
            if Y_train[i] == 0:
                negatives += 1
            elif Y_train[i] == 1:
                positives += 1
        if positives >= negatives:
            result = 1
        else:
            result = 0
        node.label = result
        if positives == 0 or negatives == 0:
            return

        left_X = []
        left_Y = []
        right_X = []
        right_Y = []
        for i in range(len(X_train)):
            if len(X_train[i]) == 0:
                return
            current = X_train[i].pop(node.attribute)

            if current == 0:
                left_X.append(X_train[i])
                left_Y.append(Y_train[i])
            elif current == 1:
                right_X.append(X_train[i])
                right_Y.append(Y_train[i])

        index_left, left_InformationGainValue = self.calculate_InfoGain(left_X, left_Y)
        index_right, right_InformationGainValue = self.calculate_InfoGain(right_X, right_Y)

        left_node = Node(index_left)
        right_node = Node(index_right)
        node.left = left_node
        node.right = right_node

        self.split(left_X, left_Y, left_node)
        self.split(right_X, right_Y, right_node)

    def predict(self, X_input):
        """
        predicts whether a patient has high cholesterol or low cholesterol
        @param X_input: input binary data
        @return: the prediction (1 if high cholesterol, 0 otherwise)
        """
        current = self.root
        while current.left is not None or current.right is not None:
            index = current.attribute
            if X_input[index] == 1:
                current = current.right
            else:
                current = current.left

        return current.label


if __name__ == "__main__":
    X, Y = read_patientFile("data.txt")
    DT = DecisionTree()

    # Split our data into train and test data
    X_train = X[:int(0.7*(len(X)))]
    Y_train = Y[:int(0.7*(len(Y)))]
    X_test = X[int(0.7*(len(X))):]
    Y_test = Y[int(0.7*(len(Y))):]

    DT.train(X_train, Y_train)

    totalCorrect = 0
    for i in range(len(Y_test)):
        X = X_test[i]
        Y = Y_test[i]

        prediction = DT.predict([X[0], X[1], X[2], X[3]])

        if prediction == int(Y):
            totalCorrect += 1

    percentageAccuracy = totalCorrect / len(Y_test)


    print("Percentage accuracy: " + str(percentageAccuracy))